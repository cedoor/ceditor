import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {InformationService} from '../../../../core/services/information/information.service'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild('footer') public footerReference: ElementRef

  constructor (private informationService: InformationService) {
  }

  ngOnInit () {
    this.informationService.createLogger(this.footerReference.nativeElement)
  }

}
