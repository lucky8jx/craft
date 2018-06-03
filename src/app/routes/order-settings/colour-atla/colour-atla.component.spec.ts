import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColourAtlaComponent } from './colour-atla.component';

describe('ColourAtlaComponent', () => {
  let component: ColourAtlaComponent;
  let fixture: ComponentFixture<ColourAtlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourAtlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourAtlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
