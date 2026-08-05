import { randomUUID } from "node:crypto";
import { uniqueEntityID } from "./unique-entity-id";

export class Entity<Props> {
  private _id: uniqueEntityID;
  protected props: Props;

  get id() {
    return this._id;
  }

  constructor(props: Props, id?: string) {
    this._id = new uniqueEntityID(id);
    this.props = props;
  }
}
