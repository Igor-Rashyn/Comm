using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Model
{
    public class Project
    {
        public int Id { get; private set; }
        public string OwnerId { get; private set; }
        public string Title { get; set; }
        public int ProjectCategoryId { get; set; }
        public ProjectCategory ProjectCategory { get; set; }
        public int ProjectStatusId { get; set; }
        public ProjectStatus ProjectStatus { get; set; }
        public int ProjectTypeId { get; set; }
        public ProjectType ProjectType { get; set; }
        public string Subtitle { get; set; }
        public string Description { get; set; } // нужно поле с возможность писать текст/ вставлять картинки и т.д как ворлд react-contenteditable https://github.com/jpuri/react-draft-wysiwyg rich text editor 
        public DateTime? Duration { get; set; }
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        //public Comment Comments { get; set; } // комментарии как ворлд документ, можно вставлять линки видео картинки и дизайнить текст
        //public string GoogleAnalytics { get; set; }
        //public string ProjectImage { get; set; }
        //public string ProjectVideo {get;set;}
        //public List<File> Files { get; set; }
        //public List<City> Cities { get; set; }
        //public List<Country> Countries { get; set; }
        private List<ProjectTask> _Tasks { get; set; }
        public IEnumerable<ProjectTask> Tasks => _Tasks.AsReadOnly();
        //public List<Chat> Chats { get; set; }
        //public List<User> Subscribers { get; set; }
        //public List<User> Team { get; set; }

        protected Project()
        {
            _Tasks = new List<ProjectTask>();
        }

        public Project(string userId) {
            OwnerId = !string.IsNullOrWhiteSpace(userId) ? userId : throw new ArgumentNullException(nameof(userId));
        }

        public ProjectTask AddTask() {

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
