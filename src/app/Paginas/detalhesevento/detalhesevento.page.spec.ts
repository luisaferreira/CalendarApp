import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetalheseventoPage } from './detalhesevento.page';

describe('DetalheseventoPage', () => {
  let component: DetalheseventoPage;
  let fixture: ComponentFixture<DetalheseventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalheseventoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalheseventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
