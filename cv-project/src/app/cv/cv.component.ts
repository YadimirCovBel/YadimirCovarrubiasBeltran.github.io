import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'] 
})
export class CvComponent implements OnInit,AfterViewInit {
  @ViewChild('cvContainer') cvContainer!: ElementRef; 
  cvData:any;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.loadJsonData();
  }

  ngAfterViewInit(): void {
    if (this.cvContainer){
      this.adjustFontSize();
    }
  }

  loadJsonData(){
    this.http.get('assets/cv-content.json').subscribe(data => {
      this.cvData =data;
      setTimeout(() => this.adjustFontSize(), 0);
    });
  }

  adjustFontSize(){
    const container = this.cvContainer.nativeElement;
    const maxFontSize = 16; //maximum font size in pixels
    const minFontSize = 10; //minimum font size in pixels
    const maxHeight = 27.94 * 37.795275591; //maximum height in pixels

    let fontSize = maxFontSize;
    container.style.fontSize = `${fontSize}px`;

    console.log('initial scrollHeight:', container.scrollHeight);
    console.log('initial fontSize:', fontSize);

    while (container.scrollHeight > maxHeight && fontSize > minFontSize) {
      fontSize--;
      container.style.fontSize = `${fontSize}px`;
      console.log('Adjusted fontSize:', fontSize);
    }
    console.log('Final scrollHeight:', container.scrollHeight);

  }

}
