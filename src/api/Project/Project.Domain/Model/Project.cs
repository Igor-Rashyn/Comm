using Project.Domain.Events;
using Project.Domain.Exceptions;
using Project.Domain.Model;
using Project.Domain.SeedWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.Domain.Model
{
    public class Project: Entity
    {
        public string OwnerId { get; private set; }
        public string Title { get; set; }

        private readonly List<Category> _projectCategories;
        public IReadOnlyCollection<Category> ProjectCategories => _projectCategories;
        private int _projectStatusId;
        public Status ProjectStatus { get; private set; }
        public int ProjectTypeId { get; set; }
        //public ProjectType ProjectType { get; set; }
        public string Subtitle { get; set; }
        public string Description { get; set; } // нужно поле с возможность писать текст/ вставлять картинки и т.д как ворлд react-contenteditable https://github.com/jpuri/react-draft-wysiwyg rich text editor 
        public DateTime? Duration { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public Comment Comments { get; set; } // комментарии как ворлд документ, можно вставлять линки видео картинки и дизайнить текст
        //public string ProjectImage { get; set; }
        //public string ProjectVideo {get;set;}
        //public List<File> Files { get; set; }
        //public List<City> Cities { get; set; }
        //public List<Country> Countries { get; set; }
        private List<ProjectTask> _tasks { get; set; }
        public IEnumerable<ProjectTask> Tasks => _tasks.AsReadOnly();
        //public List<User> Subscribers { get; set; }
        public List<Member> Team { get; set; }
        public List<Post> Posts { get; set; }

        protected Project()
        {
            _tasks = new List<ProjectTask>();
            _projectCategories = new List<Category>();
            Team = new List<Member>();
            Posts = new List<Post>();

        }

        private Project(string userId, string title, string description) : this() {
            OwnerId = !string.IsNullOrWhiteSpace(userId) ? userId : throw new ProjectDomainException(nameof(userId));
            Title = !string.IsNullOrWhiteSpace(title) ? userId : throw new ProjectDomainException(nameof(title));
            Description = !string.IsNullOrWhiteSpace(description) ? userId : throw new ProjectDomainException(nameof(description));
            _projectStatusId = Status.Draft.Id;
        }

        public static Project CreateDraft(string userId, string title, string description)
        {
            return new Project(userId, title, description);
        }

        //public JoinTeam(string userId, string message) { }


        //public ProjectTask AddTask() {

        //}

        public void SetActiveStatus() 
        {
            if(Status.Draft.Id == _projectStatusId)
            {
                AddDomainEvent(new ProjectStatusChangedToActiveDomainEvent(this));
                _projectStatusId = Status.Active.Id;
            }
        }

        public void SetCloseStatus()
        {
            AddDomainEvent(new ProjectStatusChangedToCloseDomainEvent(this));
            _projectStatusId = Status.Close.Id;
        }
    }
}

// дизвайн для веба
// похожий на кикстартер
// выбираешь категорию которую ты хочешь
//Basics там базовые вещи тайтл, видео, картинка, продолжительность, локация
//Команда тут добавляешь в команду участников и назначаешь права доступа
//Tasks создаешь таски проекта
//После заполения ты можешь превью проекта сделать
//Потом нажать кнопку Старт или Лаунч
