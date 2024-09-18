
set -e

if [ $# = 0 ]
then
 echo "Please pass the jest regex of the tests to run"
 exit 1
fi

testCases=$1 # test cases string: TC_1|TC_2|TC_3
waitForServe=$2 # boolean: should we wait for localhost:8000 and localhost:4200 to be available before running the tests
seedDb=$3 # boolean: add default payments, add default roles, populate bank names for

if [ "$seedDb" = true ]
then
  # 1. add default payment method: mada
  (
    echo "------- Running /api/admin/default-payment-method"
    curl --header "Content-Type: application/json" \
    --silent \
    --request POST \
    --data '{"name":"card_mada","displayName":"card_mada","countryCode":"SA","providerName":"Payfort","isEnabled":true,"fees":{"local":{"payer":{"absolute":0,"relative":[0],"vatInclusive":false},"receiver":{"absolute":1.5,"relative":[0],"vatInclusive":false}},"international":{}}}' \
    http://localhost:5001/ajar-dev/us-central1/api/admin/default-payment-method
    echo "------- Ended /api/admin/default-payment-method"
  ) &\

  wait # running above commands in parallel, waiting for all to finish
fi

if [ "$waitForServe" = true ]
then
  isClientOn=false
  isLandingOn=false
  clientCount=0
  landingCount=0
  emulatorCount=0

  while [ $isClientOn = false ] || [ $isLandingOn = false ]; do
    isClientOn=$(curl --output /dev/null --silent --head --fail http://localhost:8000 && echo true || echo false)
    isLandingOn=$(curl --output /dev/null --silent --head --fail http://localhost:4200 && echo true || echo false)

    if [ "$isClientOn" = false ]
    then
      clientCount=$(($clientCount + 1))
      echo "Waiting for client on localhost:8000... $clientCount"
    fi

    if [ "$isLandingOn" = false ]
    then
      landingCount=$(($landingCount + 1))
      echo "Waiting for landing-pages on localhost:4200... $landingCount"
    fi

    # limit tries to 60 (1 minute)
    if [ $clientCount -gt 60 ] || [ $landingCount -gt 60 ]
    then
      exit 62 # https://www.cyberciti.biz/faq/linux-bash-exit-status-set-exit-statusin-bash/#:~:text=No%20data%20available-,62,-Timer%20expired
    fi

    sleep 1
  done
fi

echo "------- Running test cases"

# --maxWorkers: 1 means 1 test at a time, 50% means 50% of the cpu of the machine is used for tests in parallel
npx jest --maxWorkers=1 "$testCases"
