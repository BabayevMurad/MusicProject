using Microsoft.EntityFrameworkCore;
using MusicApi.Services;
using MusicProjectShared.Data;

var builder = WebApplication.CreateBuilder(args);

//builder.WebHost.ConfigureKestrel(options =>
//{
//    options.ListenAnyIP(5002);
//});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddScoped<IMusicService, MusicService>();
builder.Services.AddScoped<IPlayListService, PlayListService>();

var conn = builder.Configuration.GetConnectionString("Default");
builder.Services.AddDbContext<MusicDbContext>(option =>
{
    option.UseSqlServer(conn);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
