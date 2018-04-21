import argparse
import pandas as pd


def main():

    args = parse_arguments()
    data_df = read_data(args.in_csv, sep=args.in_sep)
    processed_df = process_data(data_df)
    output_data(processed_df, args.out_csv, sep=args.out_sep)


def read_data(csv_path, sep):
    df = pd.read_csv(csv_path, sep=sep)
    return df


def process_data(data_df):
    return data_df


def output_data(processed_df, output_fp, sep):
    processed_df.to_csv(output_fp, sep=sep)


def parse_arguments():

    parser = argparse.ArgumentParser()
    parser.add_argument('--in_csv', required=True)
    parser.add_argument('--out_csv', required=True)
    parser.add_argument('--resolution', required=True, type=float)
    parser.add_argument('--in_sep', default=';')
    parser.add_argument('--out_sep', default='\t')
    args = parser.parse_args()
    return args


if __name__ == '__main__':
    main()
