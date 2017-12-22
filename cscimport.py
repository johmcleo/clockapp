import csv
import os

inputFileName = "cscmaster-golden.csv"
outputFileName = os.path.splitext(inputFileName)[0] + "_modified.csv"

with open(inputFileName, 'rb') as inFile, open(outputFileName, 'wb') as outfile:
    r = csv.reader(inFile)
    w = csv.writer(outfile)

    next(r, None)  # skip the first row from the reader, the old header
    # write new header
    w.writerow(['product_name', 'serial_number', 'service_pid', 'impact_status','entitled_status','license_status','months_since_original_ship','original_ship_date','name','email_address','ship_to_company','address1','address2','city','state_province','postal_code','country','theatre','first_name','last_name','phone','fax','email','notes','order_priority_date','order_type','omc','edcs','order_number','return_rma','order_process_status','fix_on_fail_status','duplicate_status'])

    # copy the rest
    for row in r:
        w.writerow(row)
