using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppAPI.DTOs
{
    public class RegisterDto
    {
        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string Passsword { get; set; }

        public string Username { get; set; }
    }
}
