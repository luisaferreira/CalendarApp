import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CalendModalPage } from './calend-modal.page';

describe('CalendModalPage', () => {
  let component: CalendModalPage;
  let fixture: ComponentFixture<CalendModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CalendModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
