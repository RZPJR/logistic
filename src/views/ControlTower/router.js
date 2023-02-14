export default [
    {
        path: '/logistic/control-tower/',
        name: 'ControlTower',
        component: () => import("./Index.vue"),
        meta: {
            auth: true,
            title: 'Control Tower'
        }
    },
    {
        path: "/logistic/control-tower/detail/:id",
        name: "ControlTowerDetail",
        component: () => import("./Detail.vue"),
        meta: {
            auth: true,
            title: "Control Tower Detail",
            breadcrumbs: [
                {
                    text: "Control Tower",
                    to: "/logistic/control-tower",
                },
                {
                    text: "Control Tower Detail",
                }
            ]
        },
    }
]