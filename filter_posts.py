#!/usr/bin/env python3

import argparse
import re
from datetime import datetime
from pathlib import Path

def parse_date(date_str):
    """Parse date string in format DD-MM-YYYY and return timestamp in milliseconds"""
    try:
        dt = datetime.strptime(date_str, '%d-%m-%Y')
        return int(dt.timestamp() * 1000)
    except ValueError:
        raise argparse.ArgumentTypeError(f"Invalid date format: {date_str}. Use DD-MM-YYYY")

def find_posts(posts_dir, after_timestamp=None, before_timestamp=None):
    """Find posts within specified date range"""
    posts_dir = Path(posts_dir)
    
    if not posts_dir.exists():
        print(f"Error: Directory {posts_dir} does not exist")
        return []
    
    results = []
    
    for md_file in posts_dir.glob("*.md"):
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
            
            title_match = re.search(r'^title:\s*(.+)$', content, re.MULTILINE)
            if not title_match:
                continue
                
            title = title_match.group(1)
            
            # Extract date from title (format: DD-MM-YYYY at the beginning)
            date_from_title = re.match(r'^(\d{2})-(\d{2})-(\d{4})', title)
            if not date_from_title:
                continue
            
            day, month, year = date_from_title.groups()
            try:
                date_obj = datetime(int(year), int(month), int(day))
                timestamp = int(date_obj.timestamp() * 1000)
            except ValueError:
                continue
            
            if after_timestamp and timestamp < after_timestamp:
                continue
            if before_timestamp and timestamp > before_timestamp:
                continue
            
            results.append({
                'file': md_file.name,
                'title': title,
                'date': date_obj.strftime('%d-%m-%Y'),
                'timestamp': timestamp
            })
    
    return results

def main():
    parser = argparse.ArgumentParser(
        description='Filter markdown posts by date range',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog='''
Examples:
  %(prog)s --after 01-09-2024
  %(prog)s --before 31-12-2024
  %(prog)s --after 01-09-2024 --before 31-12-2024
  %(prog)s --dir /path/to/posts --after 01-01-2024
        '''
    )
    
    parser.add_argument(
        '--dir', '-d',
        default='source/_posts',
        help='Directory containing markdown files (default: source/_posts)'
    )
    
    parser.add_argument(
        '--after', '-a',
        type=parse_date,
        help='Show posts after this date (DD-MM-YYYY)'
    )
    
    parser.add_argument(
        '--before', '-b',
        type=parse_date,
        help='Show posts before this date (DD-MM-YYYY)'
    )
    
    parser.add_argument(
        '--sort', '-s',
        choices=['asc', 'desc'],
        default='asc',
        help='Sort order: asc (oldest first) or desc (newest first)'
    )
    
    parser.add_argument(
        '--format', '-f',
        choices=['detailed', 'compact', 'csv'],
        default='detailed',
        help='Output format'
    )
    
    args = parser.parse_args()
    
    if not args.after and not args.before:
        parser.error('At least one of --after or --before is required')
    
    results = find_posts(args.dir, args.after, args.before)
    
    if args.sort == 'asc':
        results.sort(key=lambda x: x['timestamp'])
    else:
        results.sort(key=lambda x: x['timestamp'], reverse=True)
    
    if not results:
        print("No posts found matching the criteria")
        return
    
    print(f"Found {len(results)} posts")
    
    if args.after:
        print(f"After: {datetime.fromtimestamp(args.after/1000).strftime('%d-%m-%Y')}")
    if args.before:
        print(f"Before: {datetime.fromtimestamp(args.before/1000).strftime('%d-%m-%Y')}")
    print()
    
    if args.format == 'detailed':
        for post in results:
            print(f"- {post['date']}: {post['title']}")
            print(f"  File: {post['file']}")
            print()
    elif args.format == 'compact':
        for post in results:
            print(f"{post['date']}: {post['title']} ({post['file']})")
    elif args.format == 'csv':
        print("Date,Title,Filename")
        for post in results:
            title = post['title'].replace('"', '""')
            print(f'"{post["date"]}","{title}","{post["file"]}"')

if __name__ == "__main__":
    main()