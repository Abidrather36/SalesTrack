﻿using SalesTrack.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace salesTrack.Application.Abstraction.Jwt
{
    public  interface IJwtProvider
    {
        public string GenrateToken(User user);
    }
}