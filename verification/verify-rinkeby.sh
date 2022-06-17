while read p; do
  if [ -n "$p" ]; then
    truffle run verify "$p" --network rinkeby
  fi
done < ./verification/rinkeby-log.txt

# rm ./verification/rinkeby-log.txt