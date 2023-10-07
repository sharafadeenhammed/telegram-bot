#include <stdio.h>


int main(){
  int scores[5];
  float sum = 0, avg = 0;
  printf("Enter the Score as prompted to determine your grade...\n");
  printf("\nenter score for english ");
  scanf("%i", &scores[0]);
  printf("\nenter score for mathematics ");
  scanf("%i", &scores[1]);
  printf("\nenter score for geography ");
  scanf("%i", &scores[2]);
  printf("\nenter score for science ");
  scanf("%i", &scores[3]);
  printf("\nenter score for history ");
  scanf("%i", &scores[4]);

  for (int i = 0; i < 5; i++){
    sum += scores[i];
  }

  printf("\ntotal score is %f", sum);
  avg = sum / 5;
  printf("\nmean of toal score is %f", avg);



}