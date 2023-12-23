
using System.Data;

namespace Smouhaclub.Setting
{
    public static class UserPermissions
    {
        public static bool CanAccessPage = false;
        public static int CanAdd = 0;
        public static int CanEdit = 0;
        public static int CanDelete = 0;
        public static int CanDetails = 0;
        public static int CanSearch = 0;
        public static int CanList = 0;
        public static void CanAccess(int permissions, bool isAdmin = false)
        {
            if (permissions != 0)
            {
                CanAdd = permissions & 1;
                CanEdit = permissions & 4;
                CanDelete = permissions & 2;
                CanDetails = permissions & 16;
                CanSearch = permissions & 32;
                CanList = permissions & 8;

                if (CanList == 8)
                {
                    CanAccessPage = true;
                }
                else
                {
                    CanAccessPage = false;
                }
            }
            else if (permissions == 0 && isAdmin == true) // is admin
            {
                CanAdd = 1;
                CanEdit = 4;
                CanDelete = 2;
                CanDetails = 16;
                CanSearch = 32;
                CanList = 8;
                CanAccessPage = true;
            }
            else
            {
                CanAccessPage = false;
                CanAdd = 0;
                CanEdit = 0;
                CanDelete = 0;
                CanDetails = 0;
                CanSearch = 0;
                CanList = 0;
            }
        }

        //public static void AccessPermissions(int MenuId, int levelId, IG_EEAAContext _context)
        //{
        //    if (levelId == -1)
        //    {
        //        CanAccess(0, true);
        //    }
        //    else
        //    {
        //        var Permissions = _context.UserLevelPermissions.Where(p => p.UserLevelId == levelId && p.MenuId == MenuId).ToList();
        //        foreach (var item in Permissions)
        //        {
        //            if (String.Equals(item.MenuId, MenuId))
        //            {
        //                var Permission = int.Parse(item.GroupPermissions.ToString());
        //                CanAccess(Permission);
        //            }
        //        }
        //    }

        //}
    }
}
