namespace Smouhaclub.Setting
{
    public class AccessUserPermissions
    {
        public static bool CanAccessPage = false;
        public static int CanAdd = 0;
        public static int CanEdit = 0;
        public static int CanDelete = 0;
        public static int CanDetails = 0;
        public static int CanList = 0;
        public static void CanAccess(int LevelId)
        {
            #region

            if (LevelId != 0)
            {
                CanAdd = LevelId & 1;
                CanEdit = LevelId & 4;
                CanDelete = LevelId & 2;
                CanDetails = LevelId & 32;
                CanList = LevelId & 8;

                if (CanList == 8)
                {
                    CanAccessPage = true;
                }
                else
                {
                    CanAccessPage = false;
                }
            }
            else
            {
                CanAccessPage = false;
                CanAdd = 0;
                CanEdit = 0;
                CanDelete = 0;
                CanDetails = 0;
                CanList = 0;
            }
            #endregion

        }
    }
}
