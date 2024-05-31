export enum ACTION {
  CREATE, UPDATE, DELETE, CONFIRM
}

export class RadexBaseDialogComponent {

  constructor(protected action: ACTION = ACTION.CREATE, protected title: string) {
  }



}
