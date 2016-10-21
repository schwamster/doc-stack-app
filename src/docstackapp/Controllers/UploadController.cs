using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using System.IO;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace docstackapp.Controllers
{
    [Route("api/[controller]")]
    public class UploadController : Controller
    {
        private readonly IConfiguration config;
        private IHostingEnvironment environment;
        private readonly ILogger<UploadController> logger;

        public UploadController(IHostingEnvironment environment, ILogger<UploadController> logger)
        {
            this.config = config;
            this.environment = environment;
            this.logger = logger;
        }

        [HttpPost]
        public async Task<bool> Index(ICollection<IFormFile> file)
        {
            var result = false;
            var uploads = Path.Combine(environment.WebRootPath, "uploads");
            foreach (var f in file)
            {
                if (f.Length > 0)
                {
                    using (var fileStream = new FileStream(Path.Combine(uploads, f.FileName), FileMode.Create))
                    {
                        await f.CopyToAsync(fileStream);
                    }
                    result = true;
                }
            }
            return result;
        }
                
    }
}
