import { Directive, signal, WritableSignal } from '@angular/core';

@Directive()
export class Store<T> {
  private readonly initialValue: T;

  protected readonly state: WritableSignal<T>;

  constructor(initialState: T) {
    this.initialValue = initialState;
    this.state = signal(this.initialValue);
  }

  public resetState(): void {
    this.state.set(this.initialValue);
  }

  protected updateState(value: Partial<T>): void {
    this.state.set({ ...this.state(), ...value } as T);
  }
}
