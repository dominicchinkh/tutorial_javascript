/*
 *  An expression is a valid unit of code that resolves to a value. There are two types 
 *  of expressions: those that have side effects (such as assigning values) and those 
 *  that purely evaluate
 */

// Expression that have side effects:
//   This expression uses the = operator to assign the value seven to the variable x. 
//   The expression itself evaluates to 7
x = 7;

// Expression that purely evaluate
//   This expression uses the + operator to add 3 and 4 together and produces a value, 7
//   However, if it's not eventually part of a bigger construct, its result will be 
//   immediately discarded — this is usually a programmer mistake because the evaluation 
//   doesn't produce any effects.
3 + 4;
