import { async, TestBed } from '@angular/core/testing';
import { ProjectListModule } from './project-list.module';

describe('ProjectListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProjectListModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProjectListModule).toBeDefined();
  });
});
