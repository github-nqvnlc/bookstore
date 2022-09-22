export const adminMenu = [    
    { //admin
        name: 'menu.admin.manage_account',
        menus: [
            {
                name: 'menu.admin.manage_manager', link: '/system/user-manage'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.users-manage', link: '/system/users-manage' },
                // ]
            },
            {
                name: 'menu.admin.manage_customer', link: '/system/users-manage',
            },
            {
                name: 'menu.admin.manage_admin', link: '/system/admin-manage',
            }
        ]
    },
];