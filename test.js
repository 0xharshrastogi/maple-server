function fun(i) {
  i = 32;
  j = 0x20;

  k = i | j;
  l = i & j;
  m = k ^ l;
  console.log(i, j, k, l, m);
}

fun(3);
