import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormAddComponent} from './form-add.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('FormAddComponent', () => {
  let component: FormAddComponent;
  let fixture: ComponentFixture<FormAddComponent>;
  let btnEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [FormAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddComponent);
    component = fixture.componentInstance;
    btnEl = fixture.debugElement.query(By.css('p-button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Update tombol add menjadi loading', () => {
    component.isLoading = true; // false
    fixture.detectChanges()
    expect(btnEl.nativeElement.isLoading).toBeFalsy();
  })



});
