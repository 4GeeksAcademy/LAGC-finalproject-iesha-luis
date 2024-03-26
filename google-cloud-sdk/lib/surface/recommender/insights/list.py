# -*- coding: utf-8 -*- #
# Copyright 2020 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""recommender API insights list command."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

import itertools

from apitools.base.py import exceptions as apitools_exceptions
from googlecloudsdk.api_lib.recommender import insight
from googlecloudsdk.api_lib.recommender import insight_types
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.recommender import flags


DETAILED_HELP = {
    'EXAMPLES': """
        To list all insights for a billing account:

          $ {command} --project=project-name --location=global --insight-type=google.compute.firewall.Insight
        """,
}


@base.ReleaseTracks(base.ReleaseTrack.ALPHA, base.ReleaseTrack.BETA)
class List(base.ListCommand):
  r"""List insights for a cloud entity.

  This command lists all insights for a given cloud entity, location and
  insight type. Supported insight-types can be found here:
  https://cloud.google.com/recommender/docs/insights/insight-types. Currently
  the following cloud_entity_types are supported: project, billing_account,
  folder and organization.
  """

  detailed_help = DETAILED_HELP

  @staticmethod
  def Args(parser):
    """Args is called by calliope to gather arguments for this command.

    Args:
      parser: An argparse parser that you can use to add arguments that go on
        the command line after this command.
    """
    flags.AddParentFlagsToParser(parser)
    parser.add_argument(
        '--location', metavar='LOCATION', required=True, help='Location'
    )
    parser.add_argument(
        '--insight-type',
        metavar='INSIGHT_TYPE',
        required=False,
        help=(
            'Insight type to list insights for. Supported insight-types can '
            'be found here: '
            'https://cloud.google.com/recommender/docs/insights/insight-types'
        ),
    )
    parser.display_info.AddFormat("""
        table(
          name.basename(): label=INSIGHT_ID,
          category: label=CATEGORY,
          stateInfo.state: label=INSIGHT_STATE,
          lastRefreshTime: label=LAST_REFRESH_TIME,
          severity: label=SEVERITY,
          insightSubtype: label=INSIGHT_SUBTYPE,
          description: label=DESCRIPTION
        )
    """)

  def Run(self, args):
    """Run 'gcloud recommender insights list'.

    Args:
      args: argparse.Namespace, The arguments that this command was invoked
        with.

    Returns:
      The list of insights for this project.
    """

    insights_client = insight.CreateClient(self.ReleaseTrack())

    insights = []
    if args.insight_type is not None:
      parent_name = flags.GetInsightTypeName(args)
      insights = insights_client.List(parent_name, args.page_size)
    else:
      insight_types_client = insight_types.CreateClient(self.ReleaseTrack())
      insight_types_response = insight_types_client.List(args.page_size)
      insight_types_set = [response.name for response in insight_types_response]
      for insight_type in insight_types_set:
        parent_name = flags.GetFullInsightTypeName(args, insight_type)
        new_insights = insights_client.List(parent_name, args.page_size)

        try:  # skip insight-types that do not allow customer access
          peek = next(new_insights)  # execute first element of generator
        except (
            apitools_exceptions.HttpBadRequestError,
            apitools_exceptions.BadStatusCodeError,
            StopIteration,
        ):
          continue
        insights = itertools.chain(insights, [peek], new_insights)
    return insights


@base.ReleaseTracks(base.ReleaseTrack.GA)
class ListOriginal(base.ListCommand):
  r"""List insights for a cloud entity.

  This command lists all insights for a given cloud entity, location and
  insight type. Supported insight-types can be found here:
  https://cloud.google.com/recommender/docs/insights/insight-types. Currently
  the following cloud_entity_types are supported: project, billing_account,
  folder and organization.
  """

  detailed_help = DETAILED_HELP

  @staticmethod
  def Args(parser):
    """Args is called by calliope to gather arguments for this command.

    Args:
      parser: An argparse parser that you can use to add arguments that go on
        the command line after this command.
    """
    flags.AddParentFlagsToParser(parser)
    parser.add_argument(
        '--location', metavar='LOCATION', required=True, help='Location'
    )
    parser.add_argument(
        '--insight-type',
        metavar='INSIGHT_TYPE',
        required=True,
        help=(
            'Insight type to list insights for. Supported insight-types can '
            'be found here: '
            'https://cloud.google.com/recommender/docs/insights/insight-types'
        ),
    )
    parser.display_info.AddFormat("""
        table(
          name.basename(): label=INSIGHT_ID,
          category: label=CATEGORY,
          stateInfo.state: label=INSIGHT_STATE,
          lastRefreshTime: label=LAST_REFRESH_TIME,
          severity: label=SEVERITY,
          insightSubtype: label=INSIGHT_SUBTYPE,
          description: label=DESCRIPTION
        )
    """)

  def Run(self, args):
    """Run 'gcloud recommender insights list'.

    Args:
      args: argparse.Namespace, The arguments that this command was invoked
        with.

    Returns:
      The list of insights for this project.
    """

    insights_client = insight.CreateClient(self.ReleaseTrack())
    parent_name = flags.GetInsightTypeName(args)

    return insights_client.List(parent_name, args.page_size)