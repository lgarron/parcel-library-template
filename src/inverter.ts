import {algToString, invert, parse, Sequence} from "cubing/alg";

export class Inverter {
  public inversionCount = 0;
  protected alg: Sequence;
  constructor(s: string) {
    this.alg = parse(s);
  }

  public invert(): void {
    this.alg = invert(this.alg);
    this.inversionCount += 1;
  }

  public getAlg(): string {
    return algToString(this.alg);
  }
}
