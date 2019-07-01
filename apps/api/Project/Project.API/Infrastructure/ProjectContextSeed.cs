using Project.API.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Infrastructure
{
    public class ProjectContextSeed
    {


        private IEnumerable<ProjectStatus> GetPreconfiguredProjectStatus()
        {
            return new List<ProjectStatus>()
            {
                new ProjectStatus() { Name = "In draft"},
                new ProjectStatus() { Name = "Open" },
                new ProjectStatus() { Name = "Close" }
            };
        }

        private IEnumerable<ProjectType> GetPreconfiguredProjectType()
        {
            return new List<ProjectType>()
            {
                new ProjectType(){ Name = "Public"},
                new ProjectType(){ Name = "Private"}
            };
        }

        //TODO:
        private IEnumerable<ProjectCategory> GetPreconfiguredProjectCategory()
        {
            return new List<ProjectCategory>()
            {
                new ProjectCategory(){ Name = "Sport" },
                new ProjectCategory(){ Name = "Art" },
                new ProjectCategory(){ Name = "Environment" },
                new ProjectCategory(){ Name = "Science"},
                new ProjectCategory(){ Name = "Education"},
                new ProjectCategory(){ Name = "Family"},
                new ProjectCategory(){ Name = "Ecology"}
            };
        }
    }
}


//https://docs.microsoft.com/en-us/ef/core/modeling/relationships 110 стр в книжке