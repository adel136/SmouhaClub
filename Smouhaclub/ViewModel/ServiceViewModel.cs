using Smouhaclub.Models;

namespace Smouhaclub.ViewModel
{
    public class ServiceViewModel : TblService
    {
        public IEnumerable<TblServiceGallery> Gallery { get; set; }
    }
}
