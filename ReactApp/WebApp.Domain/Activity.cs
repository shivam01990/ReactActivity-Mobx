using System;

namespace WebApp.Domain
{
    public class Activity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }
    }
}
