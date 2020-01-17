

export const mergeClasses = (props, classes) => {
  if (props && props.className && classes && classes.root)
    classes.root = `${props.className} ${classes.root}`;
  return classes;
}