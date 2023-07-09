import { Directive, signal, WritableSignal } from '@angular/core';

@Directive()
export class Store<T> {
  private readonly initialValue: T | null = null;

  protected readonly state: WritableSignal<T | null> = signal(
    this.initialValue
  );

  constructor(initialState: T) {
    this.initialValue = initialState;
  }

  public resetState(): void {
    this.state.set(this.initialValue);
  }

  protected updateState(value: Partial<T>): void {
    this.state.set({ ...this.state(), ...value } as T);
  }
}
