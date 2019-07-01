import { async, TestBed } from '@angular/core/testing';
import { ProjectModule } from './project.module';

describe('ProjectModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProjectModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProjectModule).toBeDefined();
  });
});
