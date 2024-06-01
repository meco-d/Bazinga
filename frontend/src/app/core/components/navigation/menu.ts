

export class MenuItem {
  constructor(public order: number = 0, public name: string = '', public path: string = '/', public icon: string = '',
              public active: boolean = true, public children: MenuItem[] = []) {
  }
}

export const MENU = [
  new MenuItem(1, `Kryefaqja`, '/', 'grid_view', true),
  new MenuItem(2, `Raportet`, '/report/', 'summarize', true, [
    new MenuItem(2.1, `Aktiviteti ditor`, '/report/activity-report/', '', true),
    new MenuItem(2.2, `Shërbimet e stacionit`, '/report/service-report/', '', true),
  ]),
];
