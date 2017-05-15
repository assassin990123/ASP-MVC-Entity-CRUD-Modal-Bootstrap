using System.Web;
using System.Web.Mvc;

namespace ASP_MVC_Entity_CRUD_Modal_Bootstrap
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
