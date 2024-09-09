using Microsoft.EntityFrameworkCore;
using SalesTrack.Application.Abstraction.IRepository;
using SalesTrack.Domain.Shared;
using SalesTrack.Persistence.Data;
using System.Linq.Expressions;

namespace SalesTrack.Persistence.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T :BaseModel,new()
    {
        private readonly SalesTrackDBContext context;

        public BaseRepository(SalesTrackDBContext context)
        {
            this.context = context;
        }
        public async Task<int> DeleteAsync(T model)
        {
           await Task.Run(() => context.Set<T>().Remove(model));
            return await context.SaveChangesAsync();
        }

        public async Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> expression)
        {
          return  await Task.Run(()=> context.Set<T>().Where(expression));
        }

        public async  Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> expression)
        {
            return await context.Set<T>().FirstOrDefaultAsync(expression);
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await Task.Run(() => context.Set<T>().ToList());
        }

        public async Task<T?> GetByIdAsync(Guid Id)
        {
            return await context.Set<T>().FindAsync(Id);
        }

        public async Task<int> InsertAsync(T model)
        {
            await context.Set<T>().AddAsync(model);
            return await  context.SaveChangesAsync();
        }

        public async Task<int> InsertRangeAsync(List<T> model)
        {
           await context.Set<T>().AddRangeAsync(model);
           return await context.SaveChangesAsync();
        }

        public async  Task<bool> IsExistsAsync(Expression<Func<T, bool>> expression)
        {
             return await context.Set<T>().AnyAsync(expression);
            
        }

        public async  Task<int> UpdateAsync(T model)
        {
            await Task.Run(() =>context.Set<T>().Update(model));
            return await context.SaveChangesAsync();    
        }
    }
}
