import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import {ConsoleService} from '../../../../core/services/console/console.service'

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {

  @ViewChild('console') public loggerReference: ElementRef

  constructor (private consoleService: ConsoleService) {
  }

  ngOnInit () {
    this.consoleService.createLogger(this.loggerReference.nativeElement)
  }

}
