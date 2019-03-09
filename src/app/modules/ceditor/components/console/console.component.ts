import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {LoggerService} from '../../../../core/services/logger/logger.service'

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('console') public loggerReference: ElementRef

  constructor (private loggerService: LoggerService) {
  }

  ngOnInit () {
    this.loggerService.createLogger(this.loggerReference.nativeElement)
  }

}
