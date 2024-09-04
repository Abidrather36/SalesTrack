
using salesTrack.Application;
using salesTrack.Infrastructure;
using salesTrack.Persistence;

namespace salesTrack.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddApiService(builder.Configuration)
                            .AddApplicationService()
                            .AddInfrastructureService(builder.Configuration)
                            .AddPersistenceService(builder.Configuration);
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(policy =>
                {
                    policy.WithOrigins()
                          .AllowAnyHeader()
                          .AllowAnyMethod()
                          .AllowCredentials();
                });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
          /*  app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v2/swagger.json", "PostAPI");
                c.InjectStylesheet("/swagger-ui/SwaggerDark.css");
            });*/
            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
