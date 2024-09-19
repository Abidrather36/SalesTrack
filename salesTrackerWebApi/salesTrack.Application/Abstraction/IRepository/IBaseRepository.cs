using SalesTrack.Domain.Shared;
using System.Linq.Expressions;

namespace SalesTrack.Application.Abstraction.IRepository
{
    public interface IBaseRepository<T> where T:BaseModel, new()    
    {
        #region async methods
        Task<int> InsertAsync(T model);
        Task<int> InsertRangeAsync(List<T> model);
        Task<int> UpdateAsync(T model);
        Task<int> DeleteAsync(T model);
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindByAsync(Expression<Func<T, bool>> expression);
        Task<T?> GetByIdAsync(Guid? Id);
        Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> expression);
        Task<bool> IsExistsAsync(Expression<Func<T, bool>> expression);


        #endregion
    }
}
