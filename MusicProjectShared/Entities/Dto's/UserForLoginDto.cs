﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MusicProjectShared.Entities.Dto_s
{
    public class UserForLoginDto
    {
        #pragma warning disable CS8618
        public string Username { get; set; }
        public string Password { get; set; }
        #pragma warning restore CS8618
    }
}
