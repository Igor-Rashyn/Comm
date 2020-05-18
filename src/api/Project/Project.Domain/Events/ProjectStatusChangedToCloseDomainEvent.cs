using MediatR;

namespace Project.Domain.Events
{
    public class ProjectStatusChangedToCloseDomainEvent: INotification
    {
        public Model.Project Project { get; }

        public ProjectStatusChangedToCloseDomainEvent(Model.Project project)
        {
            Project = project;
        }
    }
}
