export class Slug {
  public value: string;

  constructor(value: string) {
    this.value = value;
  }

  /**
   * Recebe uma string e normaliza em uma slug
   *
   * exemplo: "Um exemplo de titulo" => "um-exemplo-de-titulo"
   * @param text {string}
   */
  static createFromtext(text: string) {
    const slugText = text
      .normalize("NFKD")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]/g, "")
      .replace(/_/g, "-")
      .replace(/--+/g, "-")
      .replace(/-$/g, "");

    return new Slug(slugText);
  }
}
