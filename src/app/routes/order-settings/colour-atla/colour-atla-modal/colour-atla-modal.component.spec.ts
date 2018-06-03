import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ColourAtlaModalComponent } from './colour-atla-modal.component';

describe('ColourAtlaModalComponent', () => {
  let component: ColourAtlaModalComponent;
  let fixture: ComponentFixture<ColourAtlaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColourAtlaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColourAtlaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
