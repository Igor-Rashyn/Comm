using MediatR;

namespace Project.Domain.Events
{
    /// <summary>
    /// Event used when the project is published
    /// </summary>
    public class ProjectStatusChangedToActiveDomainEvent: INotification
    {
        public Model.Project Project { get; }

        public ProjectStatusChangedToActiveDomainEvent(Model.Project project)
        {
            Project = project;
        }

    }
}
