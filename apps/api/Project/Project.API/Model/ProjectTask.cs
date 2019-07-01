using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project.API.Model
{
    public class ProjectTask
    {
        public int Id { get; set; }
        public string Title {get;set;}

        public Project Project { get; set; }
    }
}
