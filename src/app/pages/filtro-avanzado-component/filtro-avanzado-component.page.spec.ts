import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FiltroAvanzadoComponentPage } from './filtro-avanzado-component.page';

describe('FiltroAvanzadoComponentPage', () => {
  let component: FiltroAvanzadoComponentPage;
  let fixture: ComponentFixture<FiltroAvanzadoComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroAvanzadoComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltroAvanzadoComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
