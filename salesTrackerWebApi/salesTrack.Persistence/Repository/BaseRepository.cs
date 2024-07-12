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
        public Task<int> DeleteAsync(T model)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<T?> GetByIdAsync(Expression<Func<T, bool>> expression)
        {
            throw new NotImplementedException();
        }

        public Task<int> InsertAsync(T model)
        {
            throw new NotImplementedException();
        }

        public Task<int> InsertRangeAsync(List<T> model)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(T model)
        {
            throw new NotImplementedException();
        }
    }
}
