// the break inside the if ruins our job
// we can still get rid of irrelevant cases.
switch (1) {
  default:
    x();
    if (foo) break;
    y();
}
// XXX: we could optimize this better by inventing an outer
// labeled block, but that's kinda tricky.
