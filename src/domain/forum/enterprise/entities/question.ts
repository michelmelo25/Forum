import { Slug } from "./value-objects/slug";
import { Entity } from "@/core/entities/entity";
import type { UniqueEntityID } from "@/core/entities/unique-entity-id";
import type { Optional } from "@/core/types/optional";
import dayjs from "dayjs";

export interface QuestionProps {
  authorId: UniqueEntityID;
  bestAnswerId?: UniqueEntityID | null;
  title: string;
  slug: Slug;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId(): UniqueEntityID | null {
    return this.props.bestAnswerId ?? null;
  }

  get title() {
    return this.props.title;
  }

  get slug() {
    return this.props.slug;
  }

  get content() {
    return this.props.content;
  }

  get createdAd() {
    return this.props.createdAt;
  }

  get updatedAd() {
    return this.props.updatedAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAd, "days") <= 3;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat("...");
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFromtext(title);
    this.touch();
  }

  set content(content: string) {
    this.props.content = content;
    this.touch();
  }

  set bestAnswerId(bestAnswerId: UniqueEntityID | null) {
    this.props.bestAnswerId = bestAnswerId;
    this.touch();
  }

  // set bestAnswerId(bestAnswerId: UniqueEntityID | undefined) {
  //   if (bestAnswerId === undefined) {
  //     delete this.props.bestAnswerId;
  //   } else {
  //     this.props.bestAnswerId = bestAnswerId;
  //   }
  //   this.touch();
  // }

  static create(
    props: Optional<QuestionProps, "createdAt" | "slug">,
    id?: UniqueEntityID,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromtext(props.title),
        createdAt: new Date(),
      },
      id,
    );

    return question;
  }
}
